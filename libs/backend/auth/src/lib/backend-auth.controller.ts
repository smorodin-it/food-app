import { Controller } from '@nestjs/common';
import { BackendAuthService } from './backend-auth.service';

@Controller('backend-auth')
export class BackendAuthController {
  constructor(private backendAuthService: BackendAuthService) {}
}
