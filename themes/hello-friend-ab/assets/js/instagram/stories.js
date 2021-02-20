
const queryHash = `90709b530ea0969f002c86a89b4f2b8d`;
const sessionId = `sessionid=1445460994%3AZhFZmgrraGb5e1%3A8`;
const variables = `{"reel_ids":["1445460994"],"tag_names":[],"location_ids":[],"highlight_reel_ids":[],"precomposed_overlay":false,"show_story_viewer_list":true,"story_viewer_fetch_count":50,"story_viewer_cursor":"","stories_video_dash_manifest":false}`;

const url = `https://www.instagram.com/graphql/query/?query_hash=${queryHash}&variables=${variables}`;

let stories = [];

let request = new XMLHttpRequest();
request.open("GET", url, true);
request.setRequestHeader("Cookie", sessionId);

request.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status >= 200 && this.status < 300)) {
        console.log(this.responseText);
        const result = this.responseText;
        const items = result.data.reels_media.items;

        items.forEach(item => {
            let story = {
                display_resources: item.display_resources,
                display_url: item.display_url,
                is_video: item.is_video,
                story_view_count: item.story_view_count
            };

            if (item.is_video == true) {
                story.video_resources = item.video_resources;
            }

            stories.push(story);
        });
        console.log(stories);
    }
};

async function getStories() {
    request.send();
}
