import { httpRequest } from "@/utils";

// 获取频道
function getChannelsAPI() {
  return httpRequest({
    url: "/channels",
    method: "GET",
  });
}

function publishaAPI(data) {
  return httpRequest({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}

// 获取所有文章
function getArticlesAPI(params) {
  return httpRequest({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

// 删除文章
function delArticleAPI(id) {
  return httpRequest({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
}

// 获取文章详情

function getArticleById(id) {
  return httpRequest({
    url: `/mp/articles/${id}`,
  });
}

// 更新文章表单
function updateArticleAPI(data) {
  return httpRequest({
    url: `/mp/articles/${data.id}?draft=false`,
    method: "PUT",
    data,
  });
}

export {
  getChannelsAPI,
  publishaAPI,
  getArticlesAPI,
  delArticleAPI,
  getArticleById,
  updateArticleAPI,
};
