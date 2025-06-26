import Address from "../../models/address";

class AddressRepository {
  public address = Address;

  constructor() {
    this.address = Address;
  }

  async findAll() {
    return this.address.findAll();
  }

  async findById(id: string) {
    return this.address.findByPk(id);
  }

  async create(addressData: any) {
    return this.address.create(addressData);
  }

  async update(id: string, addressData: any) {
    const address = await this.address.findByPk(id);
    if (!address) {
      throw new Error("Address not found");
    }
    return address.update(addressData);
  }

  async delete(id: string) {
    const address = await this.address.findByPk(id);
    if (!address) {
      throw new Error("Address not found");
    }
    return address.update({ deletedAt: new Date() });
  }

  async findByUserId(userId: string) {
    return this.address.findOne({ where: { userId } });
  }
}

export default new AddressRepository();
