class CommonUtil {
  static printTotalGameAmount = (teamAsset1, teamAsset2) => {
    const amount1 = teamAsset1.split(" ")[0] * 1.0;
    const amount2 = teamAsset2.split(" ")[0] * 1.0;
    const sum = (amount1 + amount2) - 0.0002;
    if (sum === 0) { return 0 } else return (amount1 + amount2).toFixed(4);
  }

  static getAmount = (asset, num = 4) => {
    const amount = asset.split(" ")[0] * 1.0;
    if (num !== null) {
      return amount;
    } else {
      return amount.toFixed(num);
    }
  }

  static getDividendRate = (team, teamAsset1, teamAsset2) => {
    const teamAmount1 = CommonUtil.getAmount(teamAsset1);
    const teamAmount2 = CommonUtil.getAmount(teamAsset2);
    if (team === 0) {
      if (teamAmount1 === 0) {
        return "-"
      }
      return (0.999 * (teamAmount1 + teamAmount2) / teamAmount1).toFixed(3)
    } else if (team === 1) {
      if (teamAmount2 === 0) {
        return "-"
      }
      return (0.999 * (teamAmount1 + teamAmount2) / teamAmount2).toFixed(3)
    }
  }

  static printGameResult = (proxies, result) => {
    if (proxies.length < result) {
      return "period_desc3"
    }

    if (result === 0) { // 진행 중
      return "-";
    } else {
      return proxies[result - 1].name;
    }
  }

  static zero4 = (amount) => {
    let str = Math.round(amount * 10000) + '';
    const position = str.length - 4;
    const output = [str.slice(0, position), '.', str.slice(position)].join('');
    return output;
  }
}

export default CommonUtil;
