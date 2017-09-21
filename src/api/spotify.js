import Rx from 'rxjs';

const loremIpsumSavedTrack = {
    "added_at": "2017-09-19T00:45:29Z",
    "track": {
        "album": {
            "album_type": "single",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/1cwlYsgHBYvLzT4C24AliQ"
                    },
                    "href": "https://api.spotify.com/v1/artists/1cwlYsgHBYvLzT4C24AliQ",
                    "id": "1cwlYsgHBYvLzT4C24AliQ",
                    "name": "DJ Zinc",
                    "type": "artist",
                    "uri": "spotify:artist:1cwlYsgHBYvLzT4C24AliQ"
                }
            ],
            "available_markets": [
                "AD",
                "AR",
                "AT",
                "AU",
                "BE",
                "BG",
                "BO",
                "BR",
                "CA",
                "CH",
                "CL",
                "CO",
                "CR",
                "CY",
                "CZ",
                "DE",
                "DK",
                "DO",
                "EC",
                "EE",
                "ES",
                "FI",
                "FR",
                "GB",
                "GR",
                "GT",
                "HK",
                "HN",
                "HU",
                "ID",
                "IE",
                "IS",
                "IT",
                "JP",
                "LI",
                "LT",
                "LU",
                "LV",
                "MC",
                "MT",
                "MX",
                "MY",
                "NI",
                "NL",
                "NO",
                "NZ",
                "PA",
                "PE",
                "PH",
                "PL",
                "PT",
                "PY",
                "SE",
                "SG",
                "SK",
                "SV",
                "TH",
                "TR",
                "TW",
                "US",
                "UY"
            ],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/4zvsWoEcjGwfxWyiQMQsGc"
            },
            "href": "https://api.spotify.com/v1/albums/4zvsWoEcjGwfxWyiQMQsGc",
            "id": "4zvsWoEcjGwfxWyiQMQsGc",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/f07ab7f2575832df485af510b2702a082272bf58",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/61d94a5c936a6f6d568f3a47186e37d85616b718",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/a3cc4d08eeb1bab9a37ad2da5a8476ea67106249",
                    "width": 64
                }
            ],
            "name": "This Time",
            "type": "album",
            "uri": "spotify:album:4zvsWoEcjGwfxWyiQMQsGc"
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1cwlYsgHBYvLzT4C24AliQ"
                },
                "href": "https://api.spotify.com/v1/artists/1cwlYsgHBYvLzT4C24AliQ",
                "id": "1cwlYsgHBYvLzT4C24AliQ",
                "name": "DJ Zinc",
                "type": "artist",
                "uri": "spotify:artist:1cwlYsgHBYvLzT4C24AliQ"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/2jn9JOmdrR9BdiR1LTvYG4"
                },
                "href": "https://api.spotify.com/v1/artists/2jn9JOmdrR9BdiR1LTvYG4",
                "id": "2jn9JOmdrR9BdiR1LTvYG4",
                "name": "Boy Matthews",
                "type": "artist",
                "uri": "spotify:artist:2jn9JOmdrR9BdiR1LTvYG4"
            }
        ],
        "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY"
        ],
        "disc_number": 1,
        "duration_ms": 317970,
        "explicit": false,
        "external_ids": {
            "isrc": "GB7QY1500388"
        },
        "external_urls": {
            "spotify": "https://open.spotify.com/track/2aB2obOJyfVFvpcrBTi9k1"
        },
        "href": "https://api.spotify.com/v1/tracks/2aB2obOJyfVFvpcrBTi9k1",
        "id": "2aB2obOJyfVFvpcrBTi9k1",
        "name": "This Time",
        "popularity": 27,
        "preview_url": "https://p.scdn.co/mp3-preview/cf7e1deeca53f8ca672e5bd5b0d1c8b373472af0?cid=8897482848704f2a8f8d7c79726a70d4",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:2aB2obOJyfVFvpcrBTi9k1"
    }
};

const loremIpsumSavedAlbum = {
    "added_at" : "2014-04-12T13:29:11Z",
    "album" : {
        "album_type" : "album",
        "artists" : [ {
            "external_urls" : {
                "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
            },
            "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
            "id" : "2VAnyOxzJuSAj7XIuEOT38",
            "name" : "AlunaGeorge",
            "type" : "artist",
            "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
        } ],
        "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
        "copyrights" : [ {
            "text" : "© 2013 Universal Island Records, a division of Universal Music Operations Limited",
            "type" : "C"
        }, {
            "text" : "℗ 2013 Universal Island Records, a division of Universal Music Operations Limited",
            "type" : "P"
        } ],
        "external_ids" : {
            "upc" : "00602537275427"
        },
        "external_urls" : {
            "spotify" : "https://open.spotify.com/album/5WwesTmhyEx9cNre8fwnm9"
        },
        "genres" : [ ],
        "href" : "https://api.spotify.com/v1/albums/5WwesTmhyEx9cNre8fwnm9",
        "id" : "5WwesTmhyEx9cNre8fwnm9",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/e40dcc7d10b5b7e64c084ce11f6da359505b8018",
            "width" : 640
        }, {
            "height" : 300,
            "url" : "https://i.scdn.co/image/81e09b7a030689f54808bbf3472a23501c7a8d8c",
            "width" : 300
        }, {
            "height" : 64,
            "url" : "https://i.scdn.co/image/544f93f5629aad07c84ed1cc1a12dc7a8c82e7c4",
            "width" : 64
        } ],
        "label" : "Digital Distribution Trinidad and Tobago",
        "name" : "Body Music (Deluxe)",
        "popularity" : 50,
        "release_date" : "2013-01-01",
        "release_date_precision" : "day",
        "tracks" : {
            "href" : "https://api.spotify.com/v1/albums/5WwesTmhyEx9cNre8fwnm9/tracks?offset=0&limit=50",
            "items" : [ {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 227601,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/4a0WV99kokyChN39oQyTlB"
                },
                "href" : "https://api.spotify.com/v1/tracks/4a0WV99kokyChN39oQyTlB",
                "id" : "4a0WV99kokyChN39oQyTlB",
                "name" : "Outlines",
                "preview_url" : "https://p.scdn.co/mp3-preview/d139e9c717b5d26b891817e943b95fb0aca6ab01?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:4a0WV99kokyChN39oQyTlB"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 202338,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/70adgkFUakt1DgxqwTMC6X"
                },
                "href" : "https://api.spotify.com/v1/tracks/70adgkFUakt1DgxqwTMC6X",
                "id" : "70adgkFUakt1DgxqwTMC6X",
                "name" : "You Know You Like It",
                "preview_url" : "https://p.scdn.co/mp3-preview/a7102beeb8eeb7a26885c79aaf122d79370001f3?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:70adgkFUakt1DgxqwTMC6X"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 188592,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/1DObcq9MoYIEFuKS6SOCqQ"
                },
                "href" : "https://api.spotify.com/v1/tracks/1DObcq9MoYIEFuKS6SOCqQ",
                "id" : "1DObcq9MoYIEFuKS6SOCqQ",
                "name" : "Attracting Flies",
                "preview_url" : "https://p.scdn.co/mp3-preview/306bae8918cc19437cb3effe88bbfd6382ea78e7?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 3,
                "type" : "track",
                "uri" : "spotify:track:1DObcq9MoYIEFuKS6SOCqQ"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 217942,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/6xCKQpMuwoHIIjx4xJyaO3"
                },
                "href" : "https://api.spotify.com/v1/tracks/6xCKQpMuwoHIIjx4xJyaO3",
                "id" : "6xCKQpMuwoHIIjx4xJyaO3",
                "name" : "Your Drums, Your Love",
                "preview_url" : "https://p.scdn.co/mp3-preview/1a6b3a97a3c3ab4d85144d6d0918a0129f05fe4c?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 4,
                "type" : "track",
                "uri" : "spotify:track:6xCKQpMuwoHIIjx4xJyaO3"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 233000,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/0jYgC5NVl5Vb8x5wpbANHE"
                },
                "href" : "https://api.spotify.com/v1/tracks/0jYgC5NVl5Vb8x5wpbANHE",
                "id" : "0jYgC5NVl5Vb8x5wpbANHE",
                "name" : "Kaleidoscope Love",
                "preview_url" : "https://p.scdn.co/mp3-preview/a5f65c5b7ed4766aed5e65bfdb416505428e3a23?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 5,
                "type" : "track",
                "uri" : "spotify:track:0jYgC5NVl5Vb8x5wpbANHE"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 195790,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/46uaQOzGkaZ6hKGUFgurf1"
                },
                "href" : "https://api.spotify.com/v1/tracks/46uaQOzGkaZ6hKGUFgurf1",
                "id" : "46uaQOzGkaZ6hKGUFgurf1",
                "name" : "Bad Idea",
                "preview_url" : "https://p.scdn.co/mp3-preview/b96128bc2ca149333f05f4a19b708b5e0da2022b?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 6,
                "type" : "track",
                "uri" : "spotify:track:46uaQOzGkaZ6hKGUFgurf1"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 196951,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/56bh080V3osV5z0Iq7GmgH"
                },
                "href" : "https://api.spotify.com/v1/tracks/56bh080V3osV5z0Iq7GmgH",
                "id" : "56bh080V3osV5z0Iq7GmgH",
                "name" : "Diver",
                "preview_url" : "https://p.scdn.co/mp3-preview/25f53aa8dc3ab0d4fc055d5e90d981564492bc3b?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 7,
                "type" : "track",
                "uri" : "spotify:track:56bh080V3osV5z0Iq7GmgH"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 251936,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/0Yk1h6RrsGO8gmxLFM1PaR"
                },
                "href" : "https://api.spotify.com/v1/tracks/0Yk1h6RrsGO8gmxLFM1PaR",
                "id" : "0Yk1h6RrsGO8gmxLFM1PaR",
                "name" : "Lost & Found",
                "preview_url" : "https://p.scdn.co/mp3-preview/816c428a8ff8f2fa8484b892dc9a701c611f08d5?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 8,
                "type" : "track",
                "uri" : "spotify:track:0Yk1h6RrsGO8gmxLFM1PaR"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 224676,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/0yZZRaYflGEyfcKPy1ORi6"
                },
                "href" : "https://api.spotify.com/v1/tracks/0yZZRaYflGEyfcKPy1ORi6",
                "id" : "0yZZRaYflGEyfcKPy1ORi6",
                "name" : "Best Be Believing",
                "preview_url" : "https://p.scdn.co/mp3-preview/c48f08d48f3c1185b33d05282cf2fc8bd25558fb?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 9,
                "type" : "track",
                "uri" : "spotify:track:0yZZRaYflGEyfcKPy1ORi6"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 200991,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/1iTKS4PXZbg9KZ70GDfDvX"
                },
                "href" : "https://api.spotify.com/v1/tracks/1iTKS4PXZbg9KZ70GDfDvX",
                "id" : "1iTKS4PXZbg9KZ70GDfDvX",
                "name" : "Superstar",
                "preview_url" : "https://p.scdn.co/mp3-preview/dac3f62aead42bf062867481860a65034253dca6?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 10,
                "type" : "track",
                "uri" : "spotify:track:1iTKS4PXZbg9KZ70GDfDvX"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 192539,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/72iErhDiD1z5AJR5nRhAsg"
                },
                "href" : "https://api.spotify.com/v1/tracks/72iErhDiD1z5AJR5nRhAsg",
                "id" : "72iErhDiD1z5AJR5nRhAsg",
                "name" : "Just A Touch",
                "preview_url" : "https://p.scdn.co/mp3-preview/8b0fed1a3e98c5870dbf17de610ae03d4eab5694?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 11,
                "type" : "track",
                "uri" : "spotify:track:72iErhDiD1z5AJR5nRhAsg"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 242277,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/2D2p0eif9odHKFnRMIQU0w"
                },
                "href" : "https://api.spotify.com/v1/tracks/2D2p0eif9odHKFnRMIQU0w",
                "id" : "2D2p0eif9odHKFnRMIQU0w",
                "name" : "Body Music",
                "preview_url" : "https://p.scdn.co/mp3-preview/c382d4b0c35a07d8e170d8b88dee3e07aed79b7e?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 12,
                "type" : "track",
                "uri" : "spotify:track:2D2p0eif9odHKFnRMIQU0w"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 276828,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/5zMHwddz7IBSrCkafg8WOr"
                },
                "href" : "https://api.spotify.com/v1/tracks/5zMHwddz7IBSrCkafg8WOr",
                "id" : "5zMHwddz7IBSrCkafg8WOr",
                "name" : "Friends To Lovers",
                "preview_url" : "https://p.scdn.co/mp3-preview/29ade7e5c2357f17fe8a625b0cb1126d8e541fdd?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 13,
                "type" : "track",
                "uri" : "spotify:track:5zMHwddz7IBSrCkafg8WOr"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 167462,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/3lLly8vZ6ZYJwVpow028Zx"
                },
                "href" : "https://api.spotify.com/v1/tracks/3lLly8vZ6ZYJwVpow028Zx",
                "id" : "3lLly8vZ6ZYJwVpow028Zx",
                "name" : "This Is How We Do It",
                "preview_url" : "https://p.scdn.co/mp3-preview/0159b81785c9c724702a507251b631ff5a07d698?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 14,
                "type" : "track",
                "uri" : "spotify:track:3lLly8vZ6ZYJwVpow028Zx"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 208933,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/1ZKd8mDW9gNxsrE7HUY8s4"
                },
                "href" : "https://api.spotify.com/v1/tracks/1ZKd8mDW9gNxsrE7HUY8s4",
                "id" : "1ZKd8mDW9gNxsrE7HUY8s4",
                "name" : "We Are Chosen",
                "preview_url" : "https://p.scdn.co/mp3-preview/64c5cc84002799df5a4d9b61b9bf1a1028a10762?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 15,
                "type" : "track",
                "uri" : "spotify:track:1ZKd8mDW9gNxsrE7HUY8s4"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 196719,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/2u6hcEUqyFJQZz7YWdWtcO"
                },
                "href" : "https://api.spotify.com/v1/tracks/2u6hcEUqyFJQZz7YWdWtcO",
                "id" : "2u6hcEUqyFJQZz7YWdWtcO",
                "name" : "Indestructible",
                "preview_url" : "https://p.scdn.co/mp3-preview/bcb562aa703fba0e3c45b12c85d921a449383979?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 16,
                "type" : "track",
                "uri" : "spotify:track:2u6hcEUqyFJQZz7YWdWtcO"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 204056,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/5rGCGLP0VXNCa4NLtK9Joh"
                },
                "href" : "https://api.spotify.com/v1/tracks/5rGCGLP0VXNCa4NLtK9Joh",
                "id" : "5rGCGLP0VXNCa4NLtK9Joh",
                "name" : "Watching Over You",
                "preview_url" : "https://p.scdn.co/mp3-preview/cae11337e72344bceecffa1da49633aa9a9ce66c?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 17,
                "type" : "track",
                "uri" : "spotify:track:5rGCGLP0VXNCa4NLtK9Joh"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 261735,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/0BOzXjQ4Ljvoe19FBm3Bcm"
                },
                "href" : "https://api.spotify.com/v1/tracks/0BOzXjQ4Ljvoe19FBm3Bcm",
                "id" : "0BOzXjQ4Ljvoe19FBm3Bcm",
                "name" : "Put Up Your Hands",
                "preview_url" : "https://p.scdn.co/mp3-preview/ec9609899f2cdf584cf88d14c56fde7c24325c4f?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 18,
                "type" : "track",
                "uri" : "spotify:track:0BOzXjQ4Ljvoe19FBm3Bcm"
            }, {
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2VAnyOxzJuSAj7XIuEOT38"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2VAnyOxzJuSAj7XIuEOT38",
                    "id" : "2VAnyOxzJuSAj7XIuEOT38",
                    "name" : "AlunaGeorge",
                    "type" : "artist",
                    "uri" : "spotify:artist:2VAnyOxzJuSAj7XIuEOT38"
                } ],
                "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY" ],
                "disc_number" : 1,
                "duration_ms" : 182462,
                "explicit" : false,
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/4RLM9P5dMSIlcfapVec1Sk"
                },
                "href" : "https://api.spotify.com/v1/tracks/4RLM9P5dMSIlcfapVec1Sk",
                "id" : "4RLM9P5dMSIlcfapVec1Sk",
                "name" : "B Ur Boo",
                "preview_url" : "https://p.scdn.co/mp3-preview/c82e37f3793b2b7427207def4854428a0b913b46?cid=8897482848704f2a8f8d7c79726a70d4",
                "track_number" : 19,
                "type" : "track",
                "uri" : "spotify:track:4RLM9P5dMSIlcfapVec1Sk"
            } ],
            "limit" : 50,
            "next" : null,
            "offset" : 0,
            "previous" : null,
            "total" : 19
        },
        "type" : "album",
        "uri" : "spotify:album:5WwesTmhyEx9cNre8fwnm9"
    }
}

const page = (type, offset, limit, total, next, dummy) => ({
    "href": `https://api.spotify.com/v1/me/${type}?offset=0&limit=${limit}`,
    "items": [...Array(limit).keys()].map(x => dummy),
    "limit": limit,
    "next": next ? `https://api.spotify.com/v1/me/${type}?offset=${offset}&limit=${limit}` : null,
    "offset": offset,
    "previous": offset ? `https://api.spotify.com/v1/me/${type}?offset=${offset - limit}&limit=${limit}` : null,
    "total": total
});

export default function SpotifyApi({clientId, redirectUri}) {

    this.getSavedTracks = () => Rx.Observable.from([
        page('tracks', 0, 5, 14, true, loremIpsumSavedTrack),
        page('tracks', 5, 5, 14, true, loremIpsumSavedTrack),
        page('tracks', 10, 4, 14, false, loremIpsumSavedTrack)
    ]);

    this.getSavedAlbums = () => Rx.Observable.from([
        page('albums', 0, 5, 8, true, loremIpsumSavedAlbum),
        page('albums', 5, 3, 8, false, loremIpsumSavedAlbum)
    ]);

    this.profile = () => Promise.resolve({
        "birthdate" : "1987-02-20",
        "country" : "CO",
        "display_name" : "Pedro Otero Prada",
        "email" : "otherox@hotmail.com",
        "external_urls" : {
            "spotify" : "https://open.spotify.com/user/triplehijueputa"
        },
        "followers" : {
            "href" : null,
            "total" : 56
        },
        "href" : "https://api.spotify.com/v1/users/triplehijueputa",
        "id" : "triplehijueputa",
        "images" : [ {
            "height" : null,
            "url" : "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/14117914_10153646898932331_7750183861184224352_n.jpg?oh=5cd6fe1434cc783f65944a7c9202b7d4&oe=5A47F6B4",
            "width" : null
        } ],
        "product" : "premium",
        "type" : "user",
        "uri" : "spotify:user:triplehijueputa"
    });

    this.getTrack = () => Promise.resolve(loremIpsumSavedTrack.track);
}