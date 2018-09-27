# Merchant

## Descrição

Este módulo da API Nativa é responsável por expor métodos relativos ao lojista e suas informações.

## Interface

```ts
interface Merchant {
  getStoneCode: () => string;
  getMerchantInfo: () => MERCHANT_INFO;

  interface MERCHANT_INFO {
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    zipCode: string,
    city: string,
    state: string,
    country: string,
    acquirerIssuedMerchantId: string,
    displayName: string,
    taxationIdentificationType: string,
    taxationIdentificationNumber: string,
  }
}
```

### getStoneCode()

Retorna o `Stone Code` do lojista.

```js
import Merchant '@mamba/pos/api/merchant.js';

Merchant.getStoneCode(); // '123123123'
```

### getInfo()

Retorna dados cadastrais do lojista.

```js
import Merchant '@mamba/pos/api/merchant.js"

Merchant.getInfo();
/* {
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
}; */
```