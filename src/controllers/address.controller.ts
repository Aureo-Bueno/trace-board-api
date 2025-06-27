import { Request, Response } from "express";
import addressService from "../infra/service/address.service";

class AddressController {
  public addressService = addressService;

  constructor() {
    this.addressService = addressService;
  }

  getAddressByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const address = await this.addressService.getByUserId(userId);
    res.status(200).json(address);
  };
}

export default new AddressController();
