import {
  Core,
} from '../../simulator/index.js';

export const NAMESPACE = '$Merchant';

export const SETTINGS = {
  acquirerIssuedMerchantId: '123', // Stone code
};

const MERCHANT_INFO = {
  street: 'Avenida das Flores',
  number: '1505',
  complement: 'Sala 210',
  neighborhood: 'Barra da Praia',
  zipCode: '47590-586',
  city: 'Botânica',
  state: 'CE',
  country: 'Brasil',
  acquirerIssuedMerchantId: '97754642',
  displayName: 'José Carlos',
  taxationIdentificationType: 'CPF',
  taxationIdentificationNumber: '14575543321',
};

export function setup(Merchant) {
  /**
   * Get the stone code
   * @memberof Merchant
   * @return {string} The stone code
   */
  Merchant.getStoneCode = () => Core.get('$Merchant.acquirerIssuedMerchantId');

  Merchant.getInfo = () => MERCHANT_INFO;

}
