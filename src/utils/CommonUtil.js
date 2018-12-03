class CommonUtil {
  static printTotalGameAmount = (teamAsset1, teamAsset2) => {
    const amount1 = teamAsset1.split(" ")[0] * 1;
    const amount2 = teamAsset2.split(" ")[0] * 1;
    return (amount1 + amount2);
  }

  static printGameResult = (proxies, result) => {
    if (proxies.length < result) {
      return "무승부"
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
