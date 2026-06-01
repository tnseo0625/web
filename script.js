// ===========================
// 장르별 유튜브 영상 ID 목록
// ===========================
const playlist = {
  "K-Pop": [
    { id: "gdZLi9oWNZg", title: "BTS - Dynamite" },
    { id: "pSudEWBAYRE", title: "BLACKPINK - DDU-DU DDU-DU" },
    { id: "9bZkp7q19f0", title: "PSY - Gangnam Style" },
    { id: "nYh-n7EOtMA", title: "aespa - Next Level" },
    { id: "Km71Rr9K-Vc", title: "NewJeans - Hype Boy" }
  ],
  "팝": [
    { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You" },
    { id: "kXYiU_JCYtU", title: "Linkin Park - Numb" },
    { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody" },
    { id: "RgKAFK5djSk", title: "Wiz Khalifa - See You Again" },
    { id: "SlPhMPnQ58k", title: "The Weeknd - Blinding Lights" }
  ],
  "발라드": [
    { id: "6-v1b9waHWY", title: "임영웅 - 이제 나만 믿어요" },
    { id: "nkqQELWTsH4", title: "폴킴 - 모든 날 모든 순간" },
    { id: "vv2DSm63jhA", title: "이문세 - 광화문 연가" },
    { id: "GFCPQKbNHxk", title: "태연 - 11:11" },
    { id: "2ZIpFytCSX4", title: "백예린 - Square" }
  ],
  "힙합": [
    { id: "uelHwf8o7_U", title: "Eminem - Lose Yourself" },
    { id: "BtunFPmEXXk", title: "BTS - MIC Drop" },
    { id: "fHI8X4OXluQ", title: "빈지노 - 망원동" },
    { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off" },
    { id: "o0u4M6vppCI", title: "Cardi B - WAP" }
  ]
};

// ===========================
// 자동재생 체크박스 연동:
// 자동재생 ON → 음소거 강제 ON (브라우저 정책)
// ===========================
const autoplayCheck = document.getElementById("autoplay");
const muteCheck = document.getElementById("mute");

autoplayCheck.addEventListener("change", function () {
  if (this.checked) {
    muteCheck.checked = true; // 자동재생 시 음소거 강제
  }
});

muteCheck.addEventListener("change", function () {
  if (!this.checked && autoplayCheck.checked) {
    // 음소거 해제 시도 시 자동재생도 해제
    autoplayCheck.checked = false;
  }
});

// ===========================
// 검색(랜덤 재생) 버튼 이벤트
// ===========================
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
  const video = videos[randomIndex];

  // ✅ 핵심 수정:
  // 자동재생이 켜져 있으면 mute도 반드시 1 (브라우저 정책상 소리 있는 자동재생 차단)
  const autoplay = autoplayCheck.checked ? 1 : 0;
  const mute = autoplay === 1 ? 1 : (muteCheck.checked ? 1 : 0);

  // iframe src 구성
  const src = `https://www.youtube.com/embed/${video.id}?autoplay=${autoplay}&mute=${mute}`;

  // iframe 업데이트 (src 재설정으로 새 영상 로드)
  const frame = document.getElementById("ytFrame");
  frame.src = ""; // 초기화 후 재설정 (같은 영상 재선택 시에도 리로드)
  setTimeout(() => { frame.src = src; }, 50);

  // 링크 및 제목 업데이트
  const ytUrl = `https://www.youtube.com/watch?v=${video.id}`;
  document.getElementById("ytLink").href = ytUrl;
  document.getElementById("nowPlaying").textContent = video.title;

  // 플레이어 영역 표시
  const playerArea = document.getElementById("playerArea");
  playerArea.style.display = "block";
  playerArea.classList.add("visible");

  // 플레이어 위치로 스크롤
  setTimeout(() => {
    playerArea.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
});
