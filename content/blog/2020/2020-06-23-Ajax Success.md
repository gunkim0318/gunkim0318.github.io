---
date: '2020-06-23'
draft: false
title: ajax 200 성공 반환하는데 success 호출 안되는 문제
category: 'Error Log'
tag: [JavaScript]
image: https://user-images.githubusercontent.com/45007556/91047538-32604500-e655-11ea-8aa8-50c53e222fc7.png
subtitle: 분명 요청에 성공했는데 왜 success 함수가 실행되지 않을까? 그 해결 방법에 대해 알아보자
---

ajax를 통해 비동기 처리를 했을 때 200 상태코드를 반환하는데도 success 함수가 무슨 짓을 해도 호출이 되지 않아서 삽질한 내용에 대한 해결 방법.

# 문제

```js
$.ajax({
  url: '/reply/api/',
  type: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({
    postsId: postsId,
    content: replyContent,
  }),
  dataType: 'json',
  success: function() {
    alert('댓글 입력')
  },
})
```

# 해결 방법

```js
$.ajax({
  url: '/reply/api/',
  type: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({
    postsId: postsId,
    content: replyContent,
  }),
  success: function() {
    alert('댓글 입력')
  },
})
```

> dataType: 'json' 을 삭제해주면 된다.

일단 이렇게 해결은 했으나 원인은 서버에서 넘어오는 데이터가 json형식이 아닌게 아닌가 추측중이다
