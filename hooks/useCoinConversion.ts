import fetcher from 'lib/fetcher'
import useSWR from 'swr'

/* https://coins.llama.fi/prices/current/polygon:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174?searchWidth=4h

{"coins":{"polygon:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174":{"decimals":6,"symbol":"USDC","price":1,"timestamp":1692818281,"confidence":0.99}}}

https://coins.llama.fi/prices/current/polygon:0xc2132D05D31c914a87C6611C10748AEb04B58e8F?searchWidth=4h

{"coins":{"polygon:0xc2132D05D31c914a87C6611C10748AEb04B58e8F":{"decimals":6,"symbol":"USDT","price":0.999498,"timestamp":1692818391,"confidence":0.99}}}
 */
function getcoinaddress(coinname :string) {
  switch (coinname) { 
    case 'matic':
    case 'wmatic':
    case 'MATIC':
    case 'WMATIC':
      return '0x0000000000000000000000000000000000001010';  

    case 'eth':
    case 'weth':
    case 'ETH':
    case 'WETH':
      return '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';

    case 'usdc':
    case 'USDC': 
      return '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';

    case 'usdt':
    case 'USDT': 
      return '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';

    default:
      return '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
  }
}
export default function useCoinConversion(
  vs_currency?: string,
  symbols: string = 'eth'
) {
  const address =  getcoinaddress(symbols);

  const { data } = useSWR(
    vs_currency
      ? `https://coins.llama.fi/prices/current/polygon:${address}?searchWidth=1h`
      : null,
    fetcher,
    {
      refreshInterval: 60 * 1000 * 5, //5m Interval
      revalidateOnFocus: false,
      refreshWhenHidden: false,
    }
  )

  if (data &&  data?.coins &&  data?.coins?.[`polygon:${address}`] &&  data?.coins?.[`polygon:${address}`]?.price) {
    return data?.coins?.[`polygon:${address}`]?.price as number
  }
  return null
}
