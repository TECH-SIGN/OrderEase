import { Inject, Injectable } from '@nestjs/common';
import type { IOrderRepository } from '../infra/order.repository.interface';
import { ORDER_REPOSITORY } from '../infra/order.repository.interface';
import { PaymentOrchestratorService } from './payment-orchestrator.service';

@Injectable()
export class OrderApplicationService {
    
    constructor(
    @Inject(ORDER_REPOSITORY)
    private orderRepository: IOrderRepository,
    private readonly paymentOrchestrator: PaymentOrchestratorService,
  ) {}

  async checkout(userId: string, idempotencyKey: string): Promise<string> {
    // PHASE 1: Create order + events (transaction inside repo)
    const orderId = await this.orderRepository.checkout(
      userId,
      idempotencyKey,
    );

    // PHASE 2: Trigger next step AFTER COMMIT
    await this.paymentOrchestrator.initiatePayment(orderId);

    return orderId;
  }
}
