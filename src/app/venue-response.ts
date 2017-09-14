export class Serializable {
  fillFromJSONObject(jsonObj: JSON) {

  }
}

export class HttpResponse extends Serializable{
  response: Response;
  fillFromJSONObject(jsonObj: JSON) {
    this.response = new Response();
    if (jsonObj["response"] != null) {
      this.response.fillFromJSONObject(jsonObj["response"]);
    }
  }
}

export class Response extends Serializable{
  groups: Array<Group>;
  venue: Venue;
  fillFromJSONObject(jsonObj: JSON) {
    if (jsonObj["venue"] != null) {
      this.venue = new Venue();
      this.venue.fillFromJSONObject(jsonObj["venue"]);
    }

    this.groups = [];
    if (jsonObj["groups"] != undefined || jsonObj["groups"] != null) {
      for (var group in jsonObj["groups"]) {
        var groupObj = new Group();
        groupObj.fillFromJSONObject(jsonObj["groups"][group]);
        this.groups.push(groupObj);
      }
    }
  }
}

export class Group extends Serializable{
  items: Array<Item>;
  fillFromJSONObject(jsonObj: JSON) {
    this.items = [];
    for (var item in jsonObj["items"]) {
      var itemObj = new Item();
      itemObj.fillFromJSONObject(jsonObj["items"][item]);
      this.items.push(itemObj);
    }
  }
}

export class Item extends Serializable{
  venue: Venue;
  tips: Array<Tip>;

  fillFromJSONObject(jsonObj: JSON) {
    this.venue = new Venue();
    if (jsonObj["venue"] != null) {
      this.venue.fillFromJSONObject(jsonObj["venue"]);
    }


    if (jsonObj["tips"] != null) {
      this.tips = [];
      for (var tip in jsonObj["tips"]) {
        var tipObj = new Tip();
        tipObj.fillFromJSONObject(jsonObj["tips"][tip]);
        this.tips.push(tipObj);
      }
    }
  }

  firstThumbnailPhotoURL(): string {
    if (this.venue == null || this.venue.photos == null ) {
      return null;
    }

    return this.venue.photos.firstVenuePhotoThumbnailURL();
      // if (this.venue.pot) {
      //   return null;
      // }

      // return this.tips[0].photo.thumbnailURL();
  }
}

export class Venue extends Serializable{
  name: string;
  // var location: Location?
  // var hours: Hours?
  url: string;
  id: string;
  photos: PhotoCollection;

  fillFromJSONObject(jsonObj: JSON) {
    this.name = jsonObj["name"];
    this.url = jsonObj["url"];
    this.id = jsonObj["id"];

    if (jsonObj["photos"] != null) {
      this.photos = new PhotoCollection();
      this.photos.fillFromJSONObject(jsonObj["photos"]);
    }
  }
}

export class Tip extends Serializable{
  photo: Photo;

  fillFromJSONObject(jsonObj: JSON) {
    this.photo = new Photo();
    if (jsonObj["photo"] != null) {
      this.photo.fillFromJSONObject(jsonObj["photo"]);
    }
  }
}

export class PhotoCollection extends Serializable {
  groups: Array<PhotoGroup>;

  fillFromJSONObject(jsonObj: JSON) {
    if (jsonObj["groups"] != null) {
      this.groups = [];
      for (var group in jsonObj["groups"]) {
        var groupObj = new PhotoGroup();
        groupObj.fillFromJSONObject(jsonObj["groups"][group]);
        if (groupObj.name == "Venue photos") {
          this.groups.push(groupObj);
        }
      }
    }
  }

  firstVenuePhotoThumbnailURL(): string {
    let venuePhotos = this.venuePhotos();
    if(venuePhotos == null || venuePhotos.length == 0) {
      return null;
    }

    let photo = venuePhotos[0];
    return photo.thumbnailURL();
  }

  venuePhotos(): Array<Photo> {
    if (this.groups == null || this.groups.length == 0) {
      return null
    }

    let group = this.groups[0];
    return group.items;
  }
}

export class PhotoGroup extends Serializable {
  name: string
  items: Array<Photo>;

  fillFromJSONObject(jsonObj: JSON) {
    this.name = jsonObj["name"];

    if (jsonObj["items"] != null) {
      this.items = [];
      for (var item in jsonObj["items"]) {
        var photoObj = new Photo();
        photoObj.fillFromJSONObject(jsonObj["items"][item]);
        this.items.push(photoObj);
      }
    }
  }
}

export class Photo extends Serializable {
  prefix: string;
  suffix: string;
  visibility: string;

  fillFromJSONObject(jsonObj: JSON) {
    this.prefix = jsonObj["prefix"];
    this.suffix = jsonObj["suffix"];
    this.visibility = jsonObj["visibility"];
  }

  thumbnailURL(): string {
    if (this.prefix == null || this.suffix == null) {
      return null;
    }

    return this.prefix + 'height100' + this.suffix;
  }

  url(): string {
    if (this.prefix == null || this.suffix == null) {
      return null;
    }

    return this.prefix + '300x300' + this.suffix;
  }
}