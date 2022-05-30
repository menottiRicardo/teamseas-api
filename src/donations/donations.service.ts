import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DonationCreateInput } from "../@generated/prisma-nestjs-graphql/donation/donation-create.input";
import { PrismaService } from "../../prisma/prisma.service";
import { OrderByParams } from "../graphql";

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}
  create(createDonationInput: DonationCreateInput) {
    return this.prisma.donation.create({
      data: createDonationInput,
    });
  }

  findAll(orderBy?: OrderByParams) {
    const { field = "createdAt", direction = "desc" } = orderBy || {};
    console.log(field, direction, orderBy);
    return this.prisma.donation.findMany({
      orderBy: { [field]: direction },
    });
  }

  findOne(donationWhereUniqueInput: Prisma.DonationWhereUniqueInput) {
    return this.prisma.donation.findUnique({ where: donationWhereUniqueInput });
  }
}
