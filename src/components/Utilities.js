export const determineRole = (zaloName) => {
    let role = 'Thành Viên'; 
  
    if (zaloName === 'Minh Ngọc') {
      role = 'Tông Chủ';
    } else if (zaloName === 'Hữu Vinh' || zaloName === 'Nguyễn Bá Thành') {
      role = 'Phó Tông Chủ';
    } else if (['Phúc Lâm', 'Nguyễn Trường', 'Trí Phạm'].includes(zaloName)) {
      role = 'Trưởng Lão';
    } else if (['Phạm Tuấn Anh', 'Minh'].includes(zaloName) || zaloName.includes('Bò')) {
      role = 'Chủ Sự';
    }
  
    return role;
  };