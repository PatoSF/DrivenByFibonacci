

## Build

```shell
$ forge build
```

## Test

#### Setting Environment Variables For Current Terminal Session

```shell
$ source .env
```

#### Run All Tests

```shell
$ forge test --fork-url $SCROLL_MAINNET_RPC_URL
```
#### Run Test To Get Conversion Rates In USD For All The Supported Base Tokens

```shell
$ forge test --mt testGetConversionRatesForAllSupportedBaseTokens --fork-url $SCROLL_MAINNET_RPC_URL -vvv
```
#### Run Test To Write Token Data To Registry (Fuzz Test)

```shell
$ forge test --mt testWriteTokenData
```


#### Check Test Coverage

```shell
$ forge coverage --fork-url $SCROLL_MAINNET_RPC_URL
```







