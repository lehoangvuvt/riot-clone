const baseCDNUrl = "https://ddragon.leagueoflegends.com/cdn";

const imageService = {
  getChampionSkinURL(champId: string, skinId: string): string {
    let skinImgId = skinId.substring(skinId.length - 2, skinId.length);
    if (skinImgId.charAt(0) === "0") {
      skinImgId = skinImgId.charAt(skinImgId.length - 1);
      console.log(skinImgId);
    }

    return `${baseCDNUrl}/img/champion/splash/${champId}_${skinImgId}.jpg`;
  },
  getChampionSpellURL(skillId: string): string {
    return `${baseCDNUrl}/13.21.1/img/spell/${skillId}.png`;
  },
  getChampionPassiveURL(imgName: string): string {
    return `${baseCDNUrl}/13.21.1/img/passive/${imgName}`;
  },
};

export default imageService;
