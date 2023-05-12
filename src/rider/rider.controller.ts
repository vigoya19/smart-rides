import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ride Endpoints')
@Controller('/api/rider')
export class RiderController {}
