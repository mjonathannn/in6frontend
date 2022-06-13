export const convertStringSalaryToNumber = (salary: string): number => {
  if (Number(salary)) return Number(salary);

  let parsedSalary = salary;

  if (parsedSalary.includes('.')) {
    parsedSalary = parsedSalary.replace('.', '');
  }

  if (parsedSalary.includes(',')) {
    parsedSalary = parsedSalary.replace(',', '.');
  }

  if (parsedSalary.startsWith('R$')) {
    return Number(parsedSalary.split('R$')[1]);
  }

  return Number(parsedSalary);
};
