import React, { useEffect, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

const clusterPositionsData = {
  positions: [
    { lat: 37.5665, lng: 126.978 }, // 서울
    { lat: 35.1796, lng: 129.0756 }, // 부산
    { lat: 35.6895, lng: 139.6917 }, // 도쿄
    { lat: 35.9078, lng: 127.7669 }, // 광주
    { lat: 36.3504, lng: 127.3845 }, // 대전
    { lat: 35.1595, lng: 126.8526 }, // 전주
    { lat: 35.5384, lng: 129.3114 }, // 대구
    { lat: 37.5665, lng: 126.978 }, // 서울 (중복 예시)
    { lat: 37.5665, lng: 126.978 }, // 서울 (중복 예시)
  ],
};

const KakaoMap = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions(clusterPositionsData.positions);
  }, []);

  return (
    <Map
      center={{
        lat: 36.2683,
        lng: 127.6358,
      }}
      style={{
        width: "100%",
        height: "450px",
      }}
      level={14}
    >
      <MarkerClusterer
        options={{
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 10, // 클러스터 할 최소 지도 레벨
          gridSize: 50, // 클러스터 그리드 크기 설정 (옵션)
          calculator: ["MarkerClusterer.Calculator", "30"], // 클러스터 마커 계산기 설정 (옵션)
        }}
      >
        {positions.map((pos, index) => (
          <MapMarker
            key={`${pos.lat}-${pos.lng}`}
            position={{
              lat: pos.lat,
              lng: pos.lng,
            }}
          />
        ))}
      </MarkerClusterer>
    </Map>
  );
};

export default KakaoMap;
