import { Combobox } from "@/components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const PlayerSearch = () => {
	const [value, setValue] = useState('')
	const [playerName, setPlayerName] = useState('')

	const { data } = useQuery({
		queryKey: ['users'],
		queryFn: () => {
			return fetch(`/api/search?query=${value}`).then(res => res.json())
		},
		throwOnError: false,
	})

	const formattedUsers = data?.players?.map((user: any) => ({
		value: user.name,
		label: user.name,
	}))
	return (
		<div>
			<Combobox
				onChange={setValue}
				placeholder="Search for a player"
				buttonLabel="Search"
				options={formattedUsers || []}
				emptyMessage="No players found"
				onSelect={setPlayerName}
			/><br/>
			{playerName && <a href={`/players/${playerName}`}>View stats</a>}
		</div>
	);
};
