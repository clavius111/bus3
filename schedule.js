// 한국 공휴일 목록 (2025년 기준, 중복키 수정)
const holidays2025 = {
    "2025-01-01": "신정",
    "2025-01-28": "설날 전날",
    "2025-01-29": "설날",
    "2025-01-30": "설날 다음날",
    "2025-03-01": "삼일절",
    "2025-05-05": "어린이날",
    "2025-05-06": "대체공휴일",
    "2025-05-19": "부처님 오신 날",
    "2025-06-06": "현충일",
    "2025-08-15": "광복절",
    "2025-09-09": "추석 전날",
    "2025-09-10": "추석",
    "2025-09-11": "추석 다음날",
    "2025-10-03": "개천절",
    "2025-10-09": "한글날",
    "2025-12-25": "크리스마스"
};

// 주말인지 확인
function isWeekend(date) {
    return date.getDay() === 0 || date.getDay() === 6;
}

// 공휴일인지 확인
function isHoliday(date) {
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return holidays2025[dateString] !== undefined;
}

// 시간표 로드 함수
function loadSchedule() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const dateString = today.toLocaleDateString('ko-KR', options);

    const isWeekendOrHoliday = isWeekend(today) || isHoliday(today);

    // 날짜 정보 표시
    const dateInfoElement = document.getElementById('date-info');
    dateInfoElement.innerHTML = `
        <p>오늘 날짜: ${dateString}</p>
        <p>시간표 유형: <strong>${isWeekendOrHoliday ? '주말/공휴일' : '평일'}</strong>
        ${isHoliday(today) ? ` (${holidays2025[`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`]})` : ''}
        </p>
    `;

    // 평일/주말 파일명 지정
    const scheduleFile = isWeekendOrHoliday ? 'jumalbeoseu-seukejyul.html' : 'bus_schedule.html';

    // iframe으로 파일 로드
    const frame = document.getElementById('schedule-frame');
    const loading = document.getElementById('loading');
    frame.style.display = 'none';
    loading.style.display = 'block';

    // 파일이 정상적으로 로드되면 로딩 메시지 숨기기
    frame.onload = function() {
        loading.style.display = 'none';
        frame.style.display = 'block';
    };
    frame.onerror = function() {
        loading.innerHTML = '시간표를 불러오는 중 오류가 발생했습니다.';
        frame.style.display = 'none';
    };

    frame.src = scheduleFile;
}

// 페이지 로드 시 실행
window.onload = loadSchedule;
