// ===========================
// 장르별 유튜브 영상 ID 목록
// ===========================
const playlist = {
  "K-Pop": [
    { id: "gdZLi9oWNZg", title: "BTS - Dynamite" },
    { id: "h0KIWaUEIgQ", title: "한로로 - 사랑하게 될거야" },
    { id: "9bZkp7q19f0", title: "PSY - Gangnam Style" },
    { id: "phuiiNCxRMg", title: "aespa - Supernova" },
    { id: "EmeW6li6bbo", title: "NMIXX - Blue Valentine" }
  ],
  "발라드": [
    { id: "YBzJ0jmHv-4", title: "폴킴 - 너를 만나" },
    { id: "m3DZsBw5bnE", title: "AKMU - 어떻게 이별까지 사랑하겠어, 널 사랑하는 거지" },
    { id: "ZurHW2kBqrw", title: "카더가든 - 그대 작은 나의 세상이 되어" },
    { id: "t8P-zdkoeJA", title: "잔나비 - 주저하는 연인들을 위해" },
    { id: "gPNu9OIj4Zo", title: "정승환 - 눈사람" }
  ],
  "힙합": [
    { id: "k6CBMCI07WY", title: "다이나믹 듀오 - 고백" },
    { id: "ib-o3OZfqy4", title: "리쌍 - 광대" },
    { id: "AMWOLv4Y_0Y", title: "비와이 - Day Day (Feat. 박재범)" },
    { id: "pJ-IGZKyfpU", title: "우원재 - 시차 (We Are) (Feat. 로꼬 & GRAY)" },
    { id: "lOrU0MH0bMk", title: "창모 (CHANGMO) - METEOR" }
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
