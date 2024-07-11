/* Dependencies */
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

/* Config */
import {
  IConfiguration,
  LeafTypes,
  Leaves,
} from "@config/configuration/configuration.interface";

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get<T extends Leaves<IConfiguration>>(
    propertyPath: T
  ): LeafTypes<IConfiguration, T> {
    return this.configService.get(propertyPath);
  }
}
