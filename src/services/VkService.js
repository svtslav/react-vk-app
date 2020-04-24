import Config from '../config';

export default class VkService {

  _appId = Config.app.id;
  _appSecretKey = Config.app.secretKey;
  _appServerKey = Config.app.serverKey;
  _redirectUrl = Config.app.redirectUrl;
  _accessToken = null;

  getAccessToken = async (code, cliendId = this._appId, clientSecret = this._appSecretKey, redirectUrl = this._redirectUrl) => {
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://oauth.vk.com/access_token?client_id=${cliendId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&code=${code}`;
    const response = await fetch(apiUrl);
    const json = await response.json();
    if (!json.access_token)
      return json;
    return { 
      accessToken: json.access_token, 
      userId: json.user_id,
      expiresIn: json.expires_in 
    }
  }

  setAccessToken = (accessToken) => {
    this._accessToken = accessToken;
  }

  getAuthUrl = (scope = 'friends,groups') => {
    return `https://oauth.vk.com/authorize?client_id=${this._appId}&display=page&redirect_uri=${this._redirectUrl}&scope=${scope}&response_type=code&v=5.103`;
  }

  async getResource(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    const json = await response.json();
    if (json.error) { 
      throw new Error(json.error.error_msg); 
    }
    return json.response;
  }

  getCurrentUser = async () => {
    const fields = 'first_name,last_name,bdate,sex,relation,city,photo_max,online,last_seen,status,deactivated';
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.vk.com/method/users.get?fields=${fields}&access_token=${this._accessToken}&v=5.52`;
    const response = await this.getResource(apiUrl);
    const user = response.shift();
    return this._transformUser(user);
  }

  getUser = async (userId) => {
    const fields = 'first_name,last_name,bdate,sex,relation,city,photo_max,online,last_seen,deactivated,about,activities,games,interests,movies,music,quotes,status';
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.vk.com/method/users.get?user_id=${userId}&fields=${fields}&access_token=${this._accessToken}&v=5.52`;
    const response = await this.getResource(apiUrl);
    const user = response.shift();
    if (!user) {
      throw new Error('User not found');
    }
    return this._transformUser(user);
  }

  getFriends = async (userId) => {
    const fields = 'first_name,last_name,bday,sex,relation,city,photo_100,online,last_seen';
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.vk.com/method/friends.get?user_id=${userId}&fields=${fields}&order=random&access_token=${this._accessToken}&v=5.52`;
    const response = await this.getResource(apiUrl);
    return response.items.map((user) => {
      return this._transformUser(user);
    });
  }

  getGroups = async (userId) => {
    const fields = 'id,name,photo_100';
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.vk.com/method/groups.get?user_id=${userId}&fields=${fields}&extended=1&order=random&access_token=${this._accessToken}&v=5.52`;
    const response = await this.getResource(apiUrl);
    return response.items.map((group) => {
      return this._transformGroup(group);
    });
  }

  _transformGroup = (group) => {
    return {
      id: group.id,
      name: group.name,
      photo: group.photo_100
    }
  }

  _transformUser = (user) => {
    return {
      id: user.id,
      domain: user.domain,
      firstName: user.first_name,
      lastName: user.last_name,
      photo: user.photo_max || user.photo_100,
      city: this._mapCity(user.city),
      sex: this._mapGender(user.sex),
      birthday: user.bdate,
      relation: this._mapRelation(user.relation),
      online: this._mapOnline(user.online),
      about: user.about,
      activities: user.activities,
      games: user.games,
      interests: user.interests,
      movies: user.movies,
      music: user.music,
      quotes: user.quotes,
      status: user.status
    }
  }

  _mapGender = (gender) => {
    const mapGender = {
      0: 'не указан',
      1: 'женский',
      2: 'мужской'
    };
    return mapGender[gender];
  }

  _mapOnline = (online) => {
    const mapOnline = {
      0: 'оффлайн',
      1: 'онлайн'
    };
    return mapOnline[online];
  }

  _mapRelation = (relation) => {
    const mapRelation = {
      0: 'не указано',
      1: 'не женат/не замужем',
      2: 'есть друг/подруга',
      3: 'помолвлен/помолвлена',
      4: 'женат/замужем',
      5: 'всё сложно',
      6: 'в активном поиске',
      7: 'влюблён/влюблена',
      8: 'в гражданском браке',
    };
    return mapRelation[relation];
  }

  _mapCity = (city) => {
    if (!city) return null;
    return city.title;
  }
}