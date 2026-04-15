import { JobSalaryFormatter } from '@src/job/adapters/controllers/formatters/job-salary.formatter';

describe('JobSalaryFormatter', () => {
  describe('formatBrazilianCurrency', () => {
    it('should return zero currency when salary is empty', () => {
      expect(JobSalaryFormatter.formatBrazilianCurrency('')).toBe('R$ 0,00');
    });

    it('should return zero currency when salary is invalid', () => {
      expect(JobSalaryFormatter.formatBrazilianCurrency('abc')).toBe('R$ 0,00');
    });

    it('should format integer salary values', () => {
      expect(JobSalaryFormatter.formatBrazilianCurrency('2500')).toBe(
        'R$\u00A02.500,00',
      );
    });

    it('should normalize decimal values using comma separators', () => {
      expect(JobSalaryFormatter.formatBrazilianCurrency('2.500,50')).toBe(
        'R$\u00A02.500,50',
      );
    });

    it('should normalize decimal values using dot separators', () => {
      expect(JobSalaryFormatter.formatBrazilianCurrency('2500.5')).toBe(
        'R$\u00A02.500,50',
      );
    });
  });
});
