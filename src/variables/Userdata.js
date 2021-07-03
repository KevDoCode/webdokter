const base_url = "https://api-dokter.herokuapp.com/";
const fetchget = (url) => {
  return fetch(base_url + url, {
    headers: {
      Authorization: localStorage.getItem("tokenuser"),
    },
  });
};

const fetchpost = (url, body) => {
  return fetch(base_url + url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("tokenuser"),
    },
  });
};

const fetchput = (url, body) => {
  return fetch(base_url + url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("tokenuser"),
    },
  });
};

const fetchdelete = (url) => {
  return fetch(base_url + url, {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("tokenuser"),
    },
  });
};

export { fetchget, fetchpost, fetchput, fetchdelete };

//31 mei
//SELECT orders.date from orders where orders.date < 1622209904 order by date DESC
