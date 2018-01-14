/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 14 Jan 2018
 * Description:
 */
import * as React from 'react';
import * as Text from 'hana-ui/dist/seeds/Text';
import * as TextArea from 'hana-ui/dist/seeds/TextArea';
import {Button} from 'hana-ui/dist/seeds/Button';

import ethManager from './ethManager';
import {get} from './utils';

interface IPropTypes {

}

interface IStateTypes {
  pets: {
    name: string,
    picture: string,
    breed: string,
    age: string,
    location: string,
    id: string
  }[],
  ans: string;
  balance: string;
}

export default class App extends React.Component<IPropTypes, IStateTypes> {
  public state: IStateTypes = {
    pets: [],
    ans: '',
    balance: ''
  };

  public async componentDidMount() {
    // try {
    //   const res = await get('guessnumber.json');
    //   const {code, data} = res.data;
    //   if (code !== 0) {
    //     return;
    //   }

    //   this.setState({pets: data});
    // } catch (error) {

    // }
    ethManager.init();
  }

  private handleChange = (event, value) => {
    this.setState({ans: value});
  }

  private handleSubmit = async () => {
    event.preventDefault();
    const {ans} = this.state;

    let accounts;
    try {
      accounts = await ethManager.getAccounts();
    } catch (error) {
      console.warn(error);
    }
    
    const account = accounts[0];

    let instance;
    try {
      instance = await ethManager.contracts.guessNumber.deployed();
    } catch (error) {
      console.warn(error);
    }

    const result = instance.guess(ans, {
      from: account,
      value: 10000000000000000, //0.01 ETH
    });
    console.log(result);

    try {
      const balance = await ethManager.markAdopted();
      this.setState({balance});
    } catch (error) {
      console.log(error);
    }
  }

  public render() {
    return (
      <React.Fragment>
        <p>游戏玩法: 合约随机生成四位随机数字，1M Wei 猜一次，每次返回</p>
        <ul>
          <li>A：有几个数字猜测正确。</li>
          <li>B：有几次相同的数字出现了但位置不对。</li>
        </ul>
        <p>第一个猜对全部正确数字的玩家，将获得奖池资金的一半，并生成新的局面。</p>
        <p>当前奖池余额:</p>
        <TextArea value={this.state.balance} disabled />
        <Text
          value={this.state.ans}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleSubmit}>
          提交  
        </Button>
      </React.Fragment>
    );
  }
}
