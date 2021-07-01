const base_url = "https://api-dokter.herokuapp.com/";
const fetchget = (url) => {
  return fetch(base_url + url, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

const fetchpost = (url, body) => {
  return fetch(base_url + url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
};

const fetchput = (url, body) => {
  return fetch(base_url + url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
};

const fetchdelete = (url) => {
  return fetch(base_url + url, {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export { fetchget, fetchpost, fetchput, fetchdelete };

//31 mei
//SELECT orders.date from orders where orders.date < 1622209904 order by date DESC
