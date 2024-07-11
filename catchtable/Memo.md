# 진행중인거 
- 예약 
- 캔버스 날짜 변경시 다른 오프캔버스 열어서 예약 페이지 보이기 


# 진행할거 
- 테이블 생성하고 테이블마다 시간 확인해서 예약 가능한지 보기 
- 예약 캔버스 열릴때 서비스에 시간 5분해서 예약중으로 
- 예약상태 변경하기 
- 예약 내용 출력하기

### 최소 최대인원으로 선댁한 시간에 예약 가능한지 


## reservation table add column 'status' 
- -1 0 1



## table search 
- select * from res_table where res_no = 11 and
res_table_min_capacity <= 4 AND 
res_table_max_capacity >= 4;

인원수로 찾고 반복문 안에서 예약 체크 예약없는 테이블 선텍