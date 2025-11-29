// 简历投递表单提交逻辑
const resumeForm = document.getElementById('resumeForm');
if (resumeForm) {
  resumeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // 获取表单数据
    const formData = {
      name: resumeForm.name.value,
      phone: resumeForm.phone.value,
      email: resumeForm.email.value,
      position: resumeForm.position.value,
      intro: resumeForm.intro.value,
      time: new Date().toLocaleString()
    };
    // 从本地存储读取已有简历
    const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    // 添加新简历
    resumes.push(formData);
    // 保存到本地存储
    localStorage.setItem('resumes', JSON.stringify(resumes));
    // 提示并跳转
    alert('简历投递成功！');
    resumeForm.reset();
    window.location.href = 'list.html';
  });
}

// 简历列表渲染逻辑
const resumeList = document.getElementById('resumeList');
if (resumeList) {
  // 渲染简历列表函数
  function renderResumes() {
    const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    if (resumes.length === 0) {
      resumeList.innerHTML = '<p>暂无已投递的简历</p>';
    } else {
      resumeList.innerHTML = '';
      resumes.forEach((resume, index) => {
        const item = document.createElement('div');
        item.className = 'resume-item';
        item.innerHTML = `
          <h3>简历 ${index + 1}</h3>
          <p><strong>姓名：</strong>${resume.name}</p>
          <p><strong>电话：</strong>${resume.phone}</p>
          <p><strong>邮箱：</strong>${resume.email}</p>
          <p><strong>求职岗位：</strong>${resume.position}</p>
          <p><strong>个人简介：</strong>${resume.intro}</p>
          <p><strong>投递时间：</strong>${resume.time}</p>
        `;
        resumeList.appendChild(item);
      });
    }
  }

  // 初始渲染
  renderResumes();

  // 删除按钮逻辑
  const deleteBtn = document.getElementById('deleteBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      // 创建密码验证弹窗
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <h3>身份验证</h3>
          <label>用户名：<input type="text" id="username" required></label>
          <label>密码：<input type="password" id="password" required></label>
          <div class="modal-buttons">
            <button id="confirmDelete">确认删除</button>
            <button id="cancelDelete">取消</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.style.display = 'flex';

      // 确认删除按钮
      const confirmDelete = document.getElementById('confirmDelete');
      confirmDelete.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === 'ma' && password === '123456') {
          localStorage.removeItem('resumes');
          alert('简历数据已全部删除！');
          modal.remove();
          renderResumes();
        } else {
          alert('用户名或密码错误！');
        }
      });

      // 取消按钮
      const cancelDelete = document.getElementById('cancelDelete');
      cancelDelete.addEventListener('click', () => {
        modal.remove();
      });
    });
  }
}