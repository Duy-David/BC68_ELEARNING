import React from 'react';

const DateToWords = ({ dateInput }) => {
  const convertDateToWords = (dateStr) => {
    if (typeof dateStr !== 'string' || !dateStr.includes('/')) {
      return 'Invalid date';
    }
    // Phân tách ngày, tháng và năm từ chuỗi ngày
    const [day, month, year] = dateStr.split('/').map(Number);
    
    // Tạo đối tượng Date từ các phần tử
    const date = new Date(year, month - 1, day); // Tháng trong JavaScript bắt đầu từ 0

    // Định dạng ngày thành chữ
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return formattedDate;
  };

  return (
    <>
      <span className='mx-2'>{convertDateToWords(dateInput)}</span>
    </>
  );
};

export default DateToWords;
