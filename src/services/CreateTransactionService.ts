// import AppError from '../errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Category from '../models/Category';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: string;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Transaction type is invalid');
    }

    // Validação de categoria existente
    const foundCategory = await categoriesRepository.findOne({
      where: { title: category },
    });

    let category_id;

    if (foundCategory) {
      category_id = foundCategory.id;
    } else {
      const newCategory = await categoriesRepository.create({
        title: category,
      });
      category_id = newCategory.id;
    }

    console.log(typeof category_id);

    // const transaction = transactionsRepository.create({
    //   title,
    //   value,
    //   type,
    //   category_id,
    // });

    // await transactionsRepository.save(transaction);
  }
}

export default CreateTransactionService;
