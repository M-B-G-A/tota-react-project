class CommonUtil {
  static printTotalGameAmount = (teamAsset1, teamAsset2) => {
    const amount1 = teamAsset1.split(" ")[0] * 1;
    const amount2 = teamAsset2.split(" ")[0] * 1;
    return (amount1 + amount2) + " EOS";
  }

  static printGameResult = (proxies, result) => {
    if (result === 0) {
      return "무승부";
    } else {
      return proxies[result - 1].name;
    }
  }
}

export default CommonUtil;
