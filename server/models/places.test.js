const expect = require("expect");
const { Place } = require("./Place");

describe("Models /places", () => {
  it("should confirm the location", () => {
    const place = new Place({
      type: "restau",
      location: {
        lat: 0,
        lng: 0
      },
      name: "place"
    });
    const islocation = place.isLocation();
    expect(place.type).toBe("restau");
    expect(islocation).toEqual(true);
    // expect(place.location).toEqual(
    //   expect.objectContaining({
    //     lng: 2.287592000000018,
    //     lat: 48.862725
    //   })
    // );
  });
});
