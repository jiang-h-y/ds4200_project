import pandas as pd

USERS = "data/user_targets.csv"
PLAYLISTS = "data/df_playlists.csv"

def main():
    # read in datasets
    users = pd.read_csv(USERS)
    playlists = pd.read_csv(PLAYLISTS)

    # filter for necessary rows
    users = users[["id_owner", "openness"]]
    playlists = playlists[["id_owner", "diversity_artists"]]

    # merge datasets and process rows
    merged = pd.merge(users, playlists)
    merged = merged.groupby("openness")["diversity_artists"].median().reset_index()
    merged["openness"] = merged["openness"].map({
        0: "Low", 1: "Medium", 2: "High"
    })

    # merged.to_csv("d3Merged.csv")

if __name__ == "__main__":
    main()