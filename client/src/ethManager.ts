/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 14 Jan 2018
 * Description:
 */
import * as Web3 from 'web3/src/index.js';
import TruffleContract from 'truffle-contract';

import config from './config';
import {get} from './utils';

class EthManager {
  private _web3;
  private _web3Provider;
  private _contracts: {
    guessNumber: any
  };

  constructor() {
    this._web3Provider = null;
    this._contracts = {
      guessNumber: {}
    };
  }

  public get web3() {
    return this._web3;
  }

  public get web3Provider() {
    return this._web3Provider;
  }

  public get contracts() {
    return this._contracts;
  }

  public async init() {
    this._web3Provider = new Web3.providers.HttpProvider(config.providersHost);
    this._web3 = new Web3(this._web3Provider);

    try {
      const res = await get('/build/contracts/guessnumber.json');
      const {code, data} = res.data;
      if (code !== 0) {
        throw new Error(`Error, code: ${code}`);
      }
      this._contracts.guessNumber = TruffleContract(data);
      this._contracts.guessNumber.setProvider(this._contracts);
    } catch (error) {
      throw error;
    }

    return await this.markAdopted();
  }

  public async markAdopted() {
    console.log('markAdopted');
    const instance = await this._contracts.guessNumber.deployed();
    
    console.log(this._web3.eth);
    try {
      const balance = await this.getBalance(instance.address, 'latest');
      console.log(balance);
      return balance as string;
    } catch (error) {
      console.warn(error);
    }
  }

  private getBalance(address, str) {
    return new Promise((resolve, reject) => {
      this._web3.eth.getBalance(address, str, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  }

  public getAccounts() {
    return new Promise((resolve, reject) => {
      this._web3.eth.getAccounts((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  }
}

export default new EthManager();
