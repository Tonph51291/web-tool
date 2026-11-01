export interface BankAccountDetails {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  transferPrefix: string;
  branch: string;
  qrTemplate: string;
}

export interface UsdtWalletDetails {
  network: string;
  walletAddress: string;
  estimatedRateVND: number;
  qrCodeUrl: string;
}

export const MOCK_PAYMENT_INFO = {
  bank: {
    bankName: "MB Bank (Ngân hàng Quân Đội)",
    accountNumber: "999988889999",
    accountHolder: "CONG TY TNHH PHAN MEM AUTOTOOL",
    transferPrefix: "TOOL",
    branch: "Hà Nội",
    qrTemplate: "compact"
  } as BankAccountDetails,
  usdt: {
    network: "TRON Mainnet (TRC20)",
    walletAddress: "TYDzsYUE229T4n85ZGeW3v4zY4s5j8q9bF",
    estimatedRateVND: 25500,
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=TYDzsYUE229T4n85ZGeW3v4zY4s5j8q9bF"
  } as UsdtWalletDetails
};

