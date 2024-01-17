"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var style = {
    href: "style.css",
};
var usersUrl = "https://jsonplaceholder.typicode.com/users";
var postsUrl = "https://jsonplaceholder.typicode.com/posts";
var getUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fetch(usersUrl)];
            case 1:
                response = _a.sent();
                return [4, response.json()];
            case 2:
                data = _a.sent();
                return [2, data];
        }
    });
}); };
var getPosts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fetch(postsUrl)];
            case 1:
                response = _a.sent();
                return [4, response.json()];
            case 2:
                data = _a.sent();
                return [2, data];
        }
    });
}); };
var filterResults = function (results, searchTerm, authorTerm) {
    if (!searchTerm && !authorTerm) {
        return results;
    }
    var regexTitle = new RegExp(searchTerm, "i");
    var regexAuthor = new RegExp(authorTerm, "i");
    return results.filter(function (result) {
        var titleMatch = !searchTerm || result.articles.some(function (a) { return regexTitle.test(a.title); });
        var authorMatch = !authorTerm || regexAuthor.test(result.name);
        return (searchTerm ? titleMatch : true) && (authorTerm ? authorMatch : true);
    });
};
var loadData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, posts, userPostsMap, results, searchInput, authorInput, filteredResults, articlesList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, getUsers()];
            case 1:
                users = _a.sent();
                return [4, getPosts()];
            case 2:
                posts = _a.sent();
                userPostsMap = {};
                posts.forEach(function (post) {
                    if (!userPostsMap[post.userId]) {
                        userPostsMap[post.userId] = [];
                    }
                    userPostsMap[post.userId].push({
                        title: post.title,
                        body: post.body,
                        userId: post.userId,
                    });
                });
                results = users.map(function (user) { return ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    articles: userPostsMap[user.id] || [],
                }); });
                searchInput = document.querySelector("#search");
                authorInput = document.querySelector("#author");
                filteredResults = filterResults(results, searchInput ? searchInput.value : "", authorInput ? authorInput.value : "");
                articlesList = document.querySelector("#articles-list");
                if (articlesList) {
                    articlesList.innerHTML = filteredResults.map(function (result) {
                        var articlesHTML = "\n      <div class=\"card p-3 mb-3 col-3 mx-3\">\n        <h2 class=\"text-primary\">".concat(result.name, "</h2>\n        <h4 class=\"text-warning\">").concat(result.email, "</h4>\n        <ul class=\"list-group list-group-flush\"\">\n          ").concat(result.articles.map(function (article) { return "<li class=\"list-group-item\">".concat(article.title, "</li>"); }).join(""), "\n        </ul>\n      </div>\n      ");
                        return articlesHTML;
                    }).join("");
                }
                console.log(results);
                return [2];
        }
    });
}); };
window.addEventListener("load", loadData);
loadData();
var searchForm = document.querySelector("form");
var searchButton = document.querySelector("button");
if (searchButton) {
    searchButton.addEventListener("click", function () {
        loadData();
    });
}
if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        loadData();
    });
}
