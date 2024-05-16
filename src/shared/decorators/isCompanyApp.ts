import { SetMetadata } from "@nestjs/common";

export const COMPANY_APP_KEY = "COMPANY_APP"

export const CompanyApp = SetMetadata(COMPANY_APP_KEY, true)

