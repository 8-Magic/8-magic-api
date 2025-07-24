"use client";

import { useEffect, useRef, useState } from "react";
import supabase from "@/utils/supabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";

type AuditLogRow = {
	id: string; // uuid
	action: string;
	table_name: string;
	row_id: number | null;
	data_before: Record<string, unknown> | null;
	data_after: Record<string, unknown> | null;
	timestamp: string;
	user_id: string | null;
};

export default function AuditLogPage() {
	const [logs, setLogs] = useState<AuditLogRow[]>([]);
	const [isPaused, setIsPaused] = useState(false);
	const channelRef = useRef<RealtimeChannel | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	function handleResume() {
		if (channelRef.current) return;

		const channel = supabase
			.channel("audit-log-realtime")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "audit_log"
				},
				(payload) => {
					setLogs((prev) => [payload.new as AuditLogRow, ...prev]);
				}
			)
			.subscribe();

		channelRef.current = channel;
	}

	function handlePause() {
		if (channelRef.current) {
			supabase.removeChannel(channelRef.current);
			channelRef.current = null;
		}
	}

	useEffect(() => {
		supabase
			.from("audit_log")
			.select("*")
			.order("timestamp", { ascending: false })
			.limit(100)
			.then(({ data, error }) => {
				if (error) throw error;
				else setLogs(data || []);
			});

		handleResume();

		return () => handlePause();
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [logs.length]);

	function togglePause() {
		if (isPaused) {
			handleResume();
			setIsPaused(false);
		} else {
			handlePause();
			setIsPaused(true);
		}
	}

	return (
		<div className="p-4 h-[calc(100dvh-6rem)] bg-black font-mono text-sm overflow-hidden">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl font-bold">
					Audit Log{" "}
					{isPaused ? "" : <span className="text-green-400">(Live)</span>}
				</h1>
				<button
					onClick={togglePause}
					className={`px-4 py-1 rounded ${
						isPaused
							? "bg-yellow-600 hover:bg-yellow-700"
							: "bg-green-600 hover:bg-green-700"
					} text-white`}
				>
					{isPaused ? "Resume" : "Pause"}
				</button>
			</div>

			<div
				ref={containerRef}
				className="overflow-auto h-[calc(100%-3rem)] border rounded p-2"
			>
				{logs.map((log) => (
					<div key={log.id} className="mb-6 pb-4 border-b  space-y-1">
						<div className="">
							<strong>{log.action.toUpperCase()}</strong> on{" "}
							<code>{log.table_name}</code>{" "}
							{log.row_id !== null && `(ID: ${log.row_id})`}
						</div>
						<div className="text-xs ">
							{new Date(log.timestamp).toLocaleString()} — user:{" "}
							{log.user_id || "null (anon)"}
						</div>
						<div className="mt-2">
							{log.data_before && (
								<>
									<div className="text-yellow-500">Before:</div>
									<pre>{JSON.stringify(log.data_before, null, 2)}</pre>
								</>
							)}
							{log.data_after && (
								<>
									<div className="text-green-400">After:</div>
									<pre>{JSON.stringify(log.data_after, null, 2)}</pre>
								</>
							)}
						</div>
					</div>
				))}

				{logs.length === 0 && <div className="text-xs">Loading...</div>}
			</div>
		</div>
	);
}
