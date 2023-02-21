export enum  PaymentName{
  MSAMA_MC_PLOTS_S1 =  'Msama MC Plots S1',
}

export const PAMENT_Native_Token_Address = '0x0000000000000000000000000000000000000000';

export const PAYMENT_Token_Address = {
  'Msama MC Plots S1': [
    { name: 'GOLD', address: '0x088Fe6e0e1CaCA1eE45E8DE96AbE79e4e139F4Ab' },
    { name: 'IRON', address: '0x9E403aA2DFEF9BA2a2b82286D13864A64D90BF36' },
    { name: 'STONE', address: '0x77709C42d43F2e53c24b8fA623A207abDC89857c' },
    { name: 'WOOD', address: '0x8cE2BDc6e0319cea87337d027382f09B715C9601' },
  ],
};

export const PAMENT_CollectionAddress = [
  {
    name: PaymentName.MSAMA_MC_PLOTS_S1,
    address: '0xa17A550871E5F5F692a69a3ABE26e8DBd5991B75'
  }
];