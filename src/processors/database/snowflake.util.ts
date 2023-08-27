import os from 'node:os'

class Snowflake {
  private static readonly epoch = 1617235200000n // 自定义起始时间（以毫秒为单位）
  private static readonly workerIdBits = 5n
  private static readonly datacenterIdBits = 5n
  private static readonly sequenceBits = 12n

  private static readonly maxWorkerId = (1n << Snowflake.workerIdBits) - 1n
  private static readonly maxDatacenterId =
    (1n << Snowflake.datacenterIdBits) - 1n
  private static readonly maxSequence = (1n << Snowflake.sequenceBits) - 1n

  private static readonly workerIdShift = Snowflake.sequenceBits
  private static readonly datacenterIdShift =
    Snowflake.sequenceBits + Snowflake.workerIdBits
  private static readonly timestampLeftShift =
    Snowflake.sequenceBits + Snowflake.workerIdBits + Snowflake.datacenterIdBits

  private workerId: bigint
  private datacenterId: bigint
  private sequence: bigint = 0n
  private lastTimestamp: bigint = -1n

  constructor(workerId: bigint, datacenterId: bigint) {
    if (workerId > Snowflake.maxWorkerId || workerId < 0n) {
      throw new Error(
        `worker Id can't be greater than ${Snowflake.maxWorkerId} or less than 0`,
      )
    }
    if (datacenterId > Snowflake.maxDatacenterId || datacenterId < 0n) {
      throw new Error(
        `datacenter Id can't be greater than ${Snowflake.maxDatacenterId} or less than 0`,
      )
    }
    this.workerId = workerId
    this.datacenterId = datacenterId
  }

  private timeGen(): bigint {
    return BigInt(Date.now())
  }

  private tilNextMillis(lastTimestamp: bigint): bigint {
    let timestamp = this.timeGen()
    while (timestamp <= lastTimestamp) {
      timestamp = this.timeGen()
    }
    return timestamp
  }

  public nextId(): string {
    let timestamp = this.timeGen()

    if (timestamp < this.lastTimestamp) {
      throw new Error(
        `Clock moved backwards. Refusing to generate id for ${
          this.lastTimestamp - timestamp
        } milliseconds`,
      )
    }

    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1n) & Snowflake.maxSequence
      if (this.sequence === 0n) {
        timestamp = this.tilNextMillis(this.lastTimestamp)
      }
    } else {
      this.sequence = 0n
    }

    this.lastTimestamp = timestamp

    return (
      ((timestamp - Snowflake.epoch) << Snowflake.timestampLeftShift) |
      (this.datacenterId << Snowflake.datacenterIdShift) |
      (this.workerId << Snowflake.workerIdShift) |
      this.sequence
    ).toString()
  }
}

function getWorkerAndDatacenterId(): [number, number] {
  const interfaces = os.networkInterfaces()
  const addresses: string[] = []

  for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
      const address = interfaces[k]?.[k2]
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address)
      }
    }
  }

  // 取第一个非内部 IPv4 地址作为示例
  const ip = addresses[0]

  // 将 IP 地址转换为一个数字，然后提取低 5 位作为 workerId，高 5 位作为 datacenterId
  const ipParts = ip.split('.').map((part) => parseInt(part, 10))
  const ipNumber =
    (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3]
  const workerId = ipNumber & 0x1f // 取低 5 位
  const datacenterId = (ipNumber >> 5) & 0x1f // 取接下来的 5 位

  return [workerId, datacenterId]
}

// 使用这个函数来初始化 Snowflake
const [workerId, datacenterId] = getWorkerAndDatacenterId()

export const snowflake = new Snowflake(BigInt(workerId), BigInt(datacenterId))
