// import { AUDIT_MESSAGE } from './add-posting-value.component';

const discountList = [
  {
    month: 12,
    year: 2022,
    discount_value: 34.5,
  },
];
interface DiscountMonthData {
  month: number;
  year: number;
  discount_value: number;
}
interface DiscountData {
  competenceDate: Date;
  value: number;
  installments: number;
}
interface PlanData {
  value: number;
  discount_month: DiscountMonthData[];
}

interface ResultDiscountIsValid {
  type: 'warning' | 'error';
  valid: boolean;
  message: string;
}

const checkDiscountIsValid = (
  discount: DiscountData,
  planData: PlanData
): ResultDiscountIsValid => {
  const percentualValue = (100 * discount.value) / 100;
  const discountMonth = discount.competenceDate.getMonth();
  const discountYear = discount.competenceDate.getFullYear();

  if (percentualValue > 100) {
    return {
      type: 'error',
      message: 'fudeu minha joia',
      valid: false,
    };
  }

  return {
    message: 'WARNING',
    type: 'warning',
    valid: false,
  };
};

describe('CheckDiscountIsValid', () => {
  it.only('should return warning type when discount is more then 70%', () => {
    const discount = {
      competenceDate: new Date('2022-10-11T20:06:45.939Z'),
      value: 51.75,
      installments: 1,
    };
    const planData = {
      value: 69,
      discount_month: [
        {
          month: 12,
          year: 2022,
          discount_value: 34.5,
        },
      ],
    };
    const result = checkDiscountIsValid(discount, planData);

    expect(result).toMatchObject({
      message: 'WARNING',
      type: 'warning',
      valid: false,
    });
  });

  // it('should return warning type when discount is equal 70%', () => {
  //   const newDiscountValue = 70;
  //   const result = checkDiscountIsValid(discountList, newDiscountValue);
  //   expect(result.valid).toBeTruthy();
  // });
  // it('should return warning type when discount is equal 70%', () => {
  //   const newDiscountValue = 101;
  //   const result = checkDiscountIsValid(discountList, newDiscountValue);
  //   expect(result.valid).toBeTruthy();
  // });
});
