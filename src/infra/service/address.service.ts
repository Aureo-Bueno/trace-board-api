import logger from "../../config/logger";
import addressRepository from "../repository/address.repository";

class AddressService {
  private addressRepository = addressRepository;
  private logger = logger;
  constructor() {
    this.addressRepository = addressRepository;
    this.logger = logger;
  }

  async create(addressData: any, userId?: string) {
    this.logger.info(
      "[AddressService] Creating address with data:",
      addressData
    );
    try {
      const address = await this.addressRepository.create(addressData, {
        context: { userId: userId || null },
      } as any);
      this.logger.info(
        "[AddressService] Address created successfully:",
        address.id
      );
      return address;
    } catch (error) {
      this.logger.error("[AddressService] Error creating address:", error);
      throw error;
    }
  }

  async getByUserId(userId: string) {
    this.logger.info(`[AddressService] Retrieving address for user ID: ${userId}`);
    try {
      const address = await this.addressRepository.findByUserId(userId);
      if (!address) {
        this.logger.warn(`[AddressService] No address found for user ID: ${userId}`);
        return null;
      }
      this.logger.info(`[AddressService] Address found for user ID: ${userId}`);
      return address;
    } catch (error) {
      this.logger.error("[AddressService] Error retrieving address:", error);
      throw error;
    }
  }

  async updateAddress(addressData: any, userId: string) {
    this.logger.info(
      `[AddressService] Updating address for user ID: ${userId}`
    );
    try {
      const address = await this.addressRepository.updateByUserId(
        userId,
        addressData,
        {
          context: { userId: userId || null },
        } as any
      );
      if (!address) {
        this.logger.warn(`[AddressService] No address found for user ID: ${userId}`);
        return null;
      }
      this.logger.info(`[AddressService] Address updated for user ID: ${userId}`);
      return address;
    } catch (error) {
      this.logger.error("[AddressService] Error updating address:", error);
      throw error;
    }
  }
}

export default new AddressService();
