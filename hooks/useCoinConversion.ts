import fetcher from 'lib/fetcher'
import useSWR from 'swr'

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
