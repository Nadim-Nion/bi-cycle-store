/* eslint-disable no-unused-vars */
declare module 'sslcommerz-lts' {
  class SSLCommerzPayment {
    constructor(
      store_id: string,
      store_passwd: string,
      is_live: boolean
    );

    init(data: unknown): Promise<unknown>;
  }

  export default SSLCommerzPayment;
}