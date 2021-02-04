// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<boolean> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionRepository.findOne({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new AppError(
        'It was not possible to delete an non-existent transaction',
        400,
      );
    }

    await transactionRepository.delete(transaction.id);

    return true;
  }
}

export default DeleteTransactionService;
