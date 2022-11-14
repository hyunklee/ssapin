import { CampusCoordinate } from "../types/togethermap.interface";

interface CampusRealPlaceNameObj {
  [key: string]: string;
}

export const MESSAGE_LIST = {};

export const CAMPUS_LIST = ["0", "서울", "대전", "광주", "구미", "부울경"];

export const CAMPUS_REAL_PLACE_NAME_OBJ: CampusRealPlaceNameObj = {
  서울: "서울시",
  대전: "대전시",
  광주: "광주시",
  구미: "구미시",
  부울경: "부산시",
};

export const HASHTAG_LIST = [
  "0",
  "👤 1인",
  "👥 다수",
  "🔕 조용한",
  "🌞 햇살좋은",
  "📢 붐비는",
  "🧹 깔끔한",
  "👖 빈티지",
  "📷 인스타감성",
  "💪 건강한",
  "🚗 주차편한",
  "🥅 넓은",
  "🤵 친절한",
  "🌉 경치좋은",
  "🍲 푸짐한",
  "😋 맛있는",
  "💰 가성비",
  "🌟 밝은",
  "🔦 어두운",
  "💬 대화",
  "📖 공부",
  "🎧 음악감상",
  "🍻 회식",
  "🚶 산책",
  "👩‍💻 코딩",
  "⛺ 24시간",
  "🌅 아침일찍",
  "🌃 밤늦게",
];

export const RATING_LIST = ["0", "😄", "🙂", "😡"];

export const CAMPUS_COORDINATE_LIST: CampusCoordinate = {
  서울: {
    address_name: "서울 강남구 역삼동 718-5",
    category_group_code: "AC5",
    category_group_name: "학원",
    category_name: "교육,학문 > 학원",
    distance: "",
    id: "21414107",
    phone: "02-3429-5114",
    place_name: "SSAFY 서울 캠퍼스",
    place_url: "http://place.map.kakao.com/21414107",
    road_address_name: "서울 강남구 테헤란로 212",
    x: "127.039604663862",
    y: "37.5012860931305",
  },
  광주: {
    address_name: "광주 광산구 오선동 271",
    category_group_code: "",
    category_group_name: "",
    category_name: "서비스,산업 > 제조업",
    distance: "",
    id: "1395300236",
    phone: "",
    place_name: "SSAFY 광주 캠퍼스",
    place_url: "http://place.map.kakao.com/1395300236",
    road_address_name: "광주 광산구 하남산단6번로 107",
    x: "126.80850419238",
    y: "35.2031388453866",
  },
  구미: {
    address_name: "경북 구미시 공단동 259",
    category_group_code: "",
    category_group_name: "",
    category_name: "서비스,산업 > 공장",
    distance: "",
    id: "26396878",
    phone: "",
    place_name: "SSAFY 구미 캠퍼스",
    place_url: "http://place.map.kakao.com/26396878",
    road_address_name: "경상북도 구미시 3공단3로 302",
    x: "128.4163656538572",
    y: "36.106703327770994",
  },
  대전: {
    address_name: "대전 유성구 덕명동 124",
    category_group_code: "",
    category_group_name: "",
    category_name: "교육,학문 > 교육단체 > 연수원",
    distance: "",
    id: "7926386",
    phone: "042-820-7170",
    place_name: "SSAFY 대전 캠퍼스",
    place_url: "http://place.map.kakao.com/7926386",
    road_address_name: "대전 유성구 동서대로 98-39",
    x: "127.298408300646",
    y: "36.3553675622378",
  },
  부울경: {
    address_name: "부산 강서구 송정동 1623-2",
    category_group_code: "",
    category_group_name: "",
    category_name: "서비스,산업 > 에너지 > 전기",
    distance: "",
    id: "9121643",
    phone: "031-210-5114",
    place_name: "SSAFY 부울경 캠퍼스",
    place_url: "http://place.map.kakao.com/9121643",
    road_address_name: "부산 강서구 녹산산업중로 333",
    x: "128.85603563150357",
    y: "35.09362371920619",
  },
};

export const SSAFY_BUILDING_URL =
  "https://trippiece607.s3.ap-northeast-2.amazonaws.com/building.png";
