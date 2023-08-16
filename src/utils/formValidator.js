const isValidPhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^(\+380|0)\d{9}$/; 
  return phoneNumberRegex.test(phoneNumber);
};


export const validateForm = (formData) => {
  const errors = {};

  if (!formData.fullName) {
    errors.fullName = 'Поле обов\'язкове для заповнення';
  }

  if (!isValidPhoneNumber(formData.phoneNumber)) {
    errors.phoneNumber = 'Введіть коректний номер телефону';
  }

  if (!formData.city) {
    errors.city = 'Поле обов\'язкове для заповнення';
  }

  if (!formData.deliveryMethod) {
    errors.deliveryMethod = 'Виберіть метод доставки';
  }

  if (formData.deliveryMethod === 'novaPoshta' && !formData.novaPoshtaBranch) {
    errors.novaPoshtaBranch = 'Виберіть пункт видачі';
  }

  if (formData.deliveryMethod === 'courier' && !formData.address) {
    errors.address = 'Введіть адресу доставки';
  }

  if (!formData.paymentMethod) {
    errors.paymentMethod = 'Виберіть метод оплати';
  }

  return errors;
};