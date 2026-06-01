// 장르별 유튜브 영상 ID 목록
const playlist = {
  "K-Pop": [
    "gdZLi9oWNZg", // BTS - Dynamite
    "pSudEWBAYRE", // BLACKPINK - DDU-DU DDU-DU
    "9bZkp7q19f0", // PSY - Gangnam Style
    "nYh-n7EOtMA", // aespa - Next Level
    "Km71Rr9K-Vc"  // NewJeans - Hype Boy
  ],
  "팝": [
    "JGwWNGJdvx8", // Ed Sheeran - Shape of You
    "kXYiU_JCYtU", // Linkin Park - Numb
    "fJ9rUzIMcZQ", // Queen - Bohemian Rhapsody
    "RgKAFK5djSk", // Wiz Khalifa - See You Again
    "SlPhMPnQ58k"  // The Weeknd - Blinding Lights
  ],
  "발라드": [
    "6-v1b9waHWY", // 임영웅 - 이제 나만 믿어요
    "nkqQELWTsH4", // 폴킴 - 모든 날 모든 순간
    "vv2DSm63jhA", // 이문세 - 광화문 연가
    "GFCPQKbNHxk", // 태연 - 11:11
    "2ZIpFytCSX4"  // 백예린 - Square
  ],
  "힙합": [
    "uelHwf8o7_U", // Eminem - Lose Yourself
    "BtunFPmEXXk", // BTS - MIC Drop
    "o0u4M6vppCI", // Cardi B - WAP
    "nfWlot6h_JM", // Taylor Swift - Shake It Off
    "fHI8X4OXluQ"  // 빈지노 - 망원동
  ]
};

document.getElementById("searchBtn").addEventListener("click", function () {
  // 장르 선택 확인
  const selected = document.querySelector('input[name="genre"]:checked');
  if (!selected) {
    alert("장르를 선택해주세요.");
    return;
  }

  const genre = selected.value;
  const videos = playlist[genre];

  // 랜덤 영상 선택
  const randomIndex = Math.floor(Math.random() * videos.length);
  const videoId = videos[randomIndex];

  // 자동재생 / 음소거 옵션
  const autoplay = document.getElementById("autoplay").checked ? 1 : 0;
  const mute = document.getElementById("mute").checked ? 1 : 0;

  // iframe src 구성
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&mute=${mute}`;

  // iframe 및 링크 설정
  document.getElementById("ytFrame").src = src;
  const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;
  document.getElementById("ytLink").href = ytUrl;

  // 플레이어 영역 표시
  document.getElementById("playerArea").style.display = "block";
});
