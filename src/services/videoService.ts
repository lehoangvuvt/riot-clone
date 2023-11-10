const baseVideoUrl = "https://d28xe8vt774jo5.cloudfront.net";

const videoService = {
  getSpellVideoUrl(championKey: string, spellType: string): string {
    return `${baseVideoUrl}/champion-abilities/${championKey}/ability_${championKey}_${spellType}.webm`;
  },
};

export default videoService;
