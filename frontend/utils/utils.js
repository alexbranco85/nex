const Util = {

  formatCpf: function (cpf) {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length !== 11) {
      throw new Error('O CPF deve ter exatamente 11 dígitos.');
    }
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return formatted;
  },

  formatToCurrency: function (value) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formatter.format(value);
  },

  checkCpf: function (cpf) {
    const cleanedCpf = cpf.replace(/\D/g, '');

    if (cleanedCpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cleanedCpf)) {
      return false;
    }

    const calculateDigit = (digits) => {
      let sum = 0;
      let weight = digits.length + 1;

      for (const digit of digits) {
        sum += parseInt(digit, 10) * weight--;
      }

      const remainder = (sum * 10) % 11;
      return remainder === 10 ? 0 : remainder;
    };

    const firstDigit = calculateDigit(cleanedCpf.slice(0, 9));
    if (parseInt(cleanedCpf[9], 10) !== firstDigit) {
      return false;
    }
    const secondDigit = calculateDigit(cleanedCpf.slice(0, 10));
    if (parseInt(cleanedCpf[10], 10) !== secondDigit) {
      return false;
    }

    return true;
  }

}

module.exports = Util;